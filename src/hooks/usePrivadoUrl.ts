import { useState, useEffect } from 'react';
import { generatePrivadoShortenedUrl } from '@/services/privado.service';

export const usePrivadoUrl = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    const verifyAccount = async () => {
      try {
        setIsLoading(true);
        const url = await generatePrivadoShortenedUrl();
        if (url) setUrl(url);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    verifyAccount();
  }, []);
  return { isLoading, url };
};
