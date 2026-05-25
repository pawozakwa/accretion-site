export async function onRequest({ params }) {
  const id = encodeURIComponent(String(params.id || '').slice(0, 80));
  return Response.redirect(`https://accretionvr.com/?qr=${id}`, 302);
}
