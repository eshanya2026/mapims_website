"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SpeechRecognitionResultEvent = {
  results: SpeechRecognitionResultList;
  resultIndex: number;
};

type SpeechRecognitionErrorEvent = {
  error: string;
  message?: string;
};

type BrowserSpeechRecognition = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

function getSpeechRecognitionConstructor(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;

  const browserWindow = window as Window & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };

  return browserWindow.SpeechRecognition ?? browserWindow.webkitSpeechRecognition ?? null;
}

type UseSpeechRecognitionOptions = {
  lang?: string;
  onFinalTranscript?: (transcript: string) => void;
  onInterimTranscript?: (transcript: string) => void;
};

export function useSpeechRecognition({
  lang = "en-IN",
  onFinalTranscript,
  onInterimTranscript,
}: UseSpeechRecognitionOptions = {}) {
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsSupported(Boolean(getSpeechRecognitionConstructor()));
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognitionClass = getSpeechRecognitionConstructor();
    if (!SpeechRecognitionClass) {
      setError("Voice input is not supported in this browser.");
      return;
    }

    setError(null);

    if (isListening) {
      stopListening();
      return;
    }

    const recognition = new SpeechRecognitionClass();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = lang;

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        const transcript = result?.[0]?.transcript ?? "";

        if (result?.isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (interimTranscript) {
        onInterimTranscript?.(interimTranscript.trim());
      }

      if (finalTranscript) {
        onFinalTranscript?.(finalTranscript.trim());
      }
    };

    recognition.onerror = (event) => {
      if (event.error === "aborted" || event.error === "no-speech") {
        return;
      }

      if (event.error === "not-allowed") {
        setError("Microphone permission was denied. Please allow microphone access.");
      } else {
        setError("Unable to capture voice input. Please try again.");
      }

      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
      setIsListening(true);
    } catch {
      setError("Unable to start voice input. Please try again.");
      setIsListening(false);
    }
  }, [isListening, lang, onFinalTranscript, onInterimTranscript, stopListening]);

  useEffect(() => {
    if (!error) return;

    const timeoutId = window.setTimeout(() => {
      setError(null);
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [error]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  return {
    isSupported,
    isListening,
    error,
    startListening,
    stopListening,
    clearError: () => setError(null),
  };
}
