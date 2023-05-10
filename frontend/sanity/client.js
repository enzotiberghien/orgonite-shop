import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';


export const client = createClient({
  projectId: '3f4jk2dm',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03', 
})

export async function getProducts() {
  const products = await client.fetch('*[_type == "product"]')
  return products
}

const builder = imageUrlBuilder(client);

export function imageUrlFor(source) {
  return builder.image(source);
}
