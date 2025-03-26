"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface District {
  _id: string;
  name: string;
  image: string;
  coordinates: number[];
  population: number;
  area: number;
  description: string;
  history: string;
  attractions: string[];
  funFacts: string[];
  mustVisit: boolean;
}

export default function useDistricts() {
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get("/api/districts");
        setDistricts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setLoading(false);
      }
    };

    fetchDistricts();
  }, []);

  return { districts, loading, error };
};

