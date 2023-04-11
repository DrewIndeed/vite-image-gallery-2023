export const local = ({ key, value }: { key: string; value?: string }) => {
  return {
    set: () => window.localStorage.setItem(key, value || ""),
    get: () => window.localStorage.getItem(key),
    bye: () => window.localStorage.removeItem(key),
  };
};

export const truncateString = (str: string, num: number) => {
  if (str.length <= num) return str;
  return str.slice(0, num) + "...";
};

export const data = [
  {
    name: "David Marcu",
    description: "David Marcu",
    imageUrl: "https://picsum.photos/1800/3200",
  },
  {
    name: "Tim Swaan",
    description: "Tim Swaan",
    imageUrl: "https://picsum.photos/1800/3200",
  },
  {
    name: "v2osk",
    description: "v2osk",
    imageUrl: "https://picsum.photos/1800/3200",
  },
  {
    name: "Lukasz Szmigiel",
    description: "Lukasz Szmigiel",
    imageUrl: "https://picsum.photos/1800/3200",
  },
  {
    name: "Robert Lukeman",
    description: "Robert Lukeman",
    imageUrl: "https://picsum.photos/1800/3200",
  },
  {
    name: "Dave Hoefler",
    description: "Dave Hoefler",
    imageUrl: "https://picsum.photos/1800/3200",
  },
  {
    name: "Silvestri Matteo",
    description: "Silvestri Matteo",
    imageUrl: "https://picsum.photos/1800/3200",
  },
  {
    name: "Shifaaz shamoon",
    description: "Shifaaz shamoon",
    imageUrl: "https://picsum.photos/1800/3200",
  },
  {
    name: "niko photos",
    description: "niko photos",
    imageUrl: "https://picsum.photos/3000/2000",
  },
  {
    name: "Jay Mantri",
    description: "Jay Mantri",
    imageUrl: "https://picsum.photos/3000/2000",
  },
  {
    name: "Daniel Roe",
    description: "Daniel Roe",
    imageUrl: "https://picsum.photos/3000/2000",
  },
  {
    name: "Thomas Kelley",
    description: "Thomas Kelley",
    imageUrl: "https://picsum.photos/3000/2000",
  },
  {
    name: "Vincent van Zalinge",
    description: "Vincent van Zalinge",
    imageUrl: "https://picsum.photos/3000/2000",
  },
  {
    name: "eberhard 🖐 grossgasteiger",
    description: "eberhard 🖐 grossgasteiger",
    imageUrl: "https://picsum.photos/3000/2000",
  },
  {
    name: "Luca Bravo",
    description: "Luca Bravo",
    imageUrl: "https://picsum.photos/3000/2000",
  },
  {
    name: "Wil Stewart",
    description: "Wil Stewart",
    imageUrl: "https://picsum.photos/3000/2000",
  },
].sort(() => Math.random() - 0.5);
