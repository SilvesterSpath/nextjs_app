const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch all properties
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

// Fetch single property
export async function fetchProperty(id) {
  try {
    // if domain is not awailable yet
    if (!apiDomain) {
      return null;
    }

    // this is on the server so I have to include full domain
    const response = await fetch(`${apiDomain}/properties/${id}`);

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    return response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
