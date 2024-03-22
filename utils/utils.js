export async function fetchProperties() {
  try {
    // this is on the server so I have to include full domain
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`
    );
    if (!response.ok) {
      throw new Error('Something went wrong');
    }
    return response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}
