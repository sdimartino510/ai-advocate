export default function CoverComponent({editing}) {
console.log('isEditing?',editing)
  return (
    <div className={`${!editing ? 'hidden':''} fixed insert-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}></div>
)}