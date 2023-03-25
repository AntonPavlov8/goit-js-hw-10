export default async function fetchCountries(name) {
  const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  if (!response.ok) {
    throw new Error(response.status);
  } else return response.json();
}
