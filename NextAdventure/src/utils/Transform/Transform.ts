export const mapUrlFragments = (url: string) => {
  const map = {} as { [s: string]: string };
  url.substring(url.indexOf("?") + 1)
      .split("&")
      .map(fragment => fragment.split("="))
      .forEach(fragment => {
          map[fragment[0]] = fragment[1];
      });

  return map;
};