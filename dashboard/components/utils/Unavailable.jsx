export default function Unavailable({ message }) {
  return (
    <div className='text-center text-m text-gray-500 p-2 my-2'>
      🚫 No {message} Available
    </div>
  );
}
