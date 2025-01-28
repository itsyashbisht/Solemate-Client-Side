export default function products({ shoe }) {
  const { imageURL, name, price } = shoe;

  return (
    <div className="w-full mx-10">
      <img src={imageURL} className="h-full w-full object-cover" alt={name} />
      <div className="flex justify-between">
        <p>{name}</p>
        <p>{`$${price}`}</p>
      </div>
    </div>
  );
}
