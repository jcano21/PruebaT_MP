const FormModal = ({ isOpen, onClose, title, fields, onSubmit, initialData }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    fields.forEach((field) => {
      data[field.name] = formData.get(field.name);
    });
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label className="block mb-1">{field.label}</label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  defaultValue={initialData?.[field.name] || ''}
                  className="w-full p-2 border rounded"
                  required={field.required}
                >
                  <option value="">Seleccione...</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  defaultValue={initialData?.[field.name] || ''}
                  className="w-full p-2 border rounded"
                  required={field.required}
                />
              )}
            </div>
          ))}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;