function readingTime(value: string) {
  const wordsPerMinute = 200;
  const words = value.match(/\w+/g)?.length || 0;
  const minutes = words / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  return readTime;
}

export default {
  readingTime,
};
