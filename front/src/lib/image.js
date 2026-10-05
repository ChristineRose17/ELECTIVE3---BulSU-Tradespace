// Shrinks a photo to a small JPEG data URL so it fits in localStorage.
// With Supabase Storage you would upload the original File instead.
export const shrink = (file) => new Promise((res) => {
  const img = new Image();
  img.onload = () => {
    const s = Math.min(1, 600 / img.width), c = document.createElement('canvas');
    c.width = img.width * s; c.height = img.height * s;
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    URL.revokeObjectURL(img.src);
    res(c.toDataURL('image/jpeg', 0.7));
  };
  img.src = URL.createObjectURL(file);
});
