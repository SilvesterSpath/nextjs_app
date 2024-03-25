const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function fetchProperties() {
  try {
    // if domain is not awailable yet
    if (!apiDomain) {
      return [];
    }

    // this is on the server so I have to include full domain
    const response = await fetch(`${apiDomain}/properties`);
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    return response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}
