export const getBase64 = (file: Blob): Promise<string> => {
  const width = 300;
  const height = 200;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          console.error('Contexto 2D não suportado.');
          reject()
          return;
        }
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const baseURL = canvas.toDataURL('image/jpeg');
        resolve(baseURL);
      };

      img.src = event.target?.result as string;
    };
  });
};

export const parsedNumber = (number: number, targetLength: number, padString: string) => {
  return number.toString().padStart(targetLength, padString);
};

export const parsedData = (date: string) => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();

  const parsedData = (value: number) => {
    return parsedNumber(value || 1, 2, '0');
  };

  return {
    day: parsedData(day),
    month: parsedData(month),
    year
  };
};

export const formattedDate = (date: string) => {
  const formatted = parsedData(date);
  const { day, month, year } = formatted || {};
  return `${month}.${day}.${year}`;
};