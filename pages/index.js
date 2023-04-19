import { Plus, Save, Trash2 } from "react-feather";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const Item = ({ field, onRemoveFieldButtonClick, handleEditField }) => {
  const [shouldShowEditOptions, setShouldShowEditOptions] = useState(false);
  const [currField, setCurrField] = useState(field);
  const [schema, setSchema] = useState({ fields: field.fields });

  const onAddFieldButtonClick = (field) => {
    const newField = {
      id: uuidv4(),
      name: "name",
      type: "string",
      isRequired: false,
    };

    let newFields = [];

    if (schema.fields) {
      newFields = [...schema.fields, newField];
    } else {
      newFields = [newField];
    }

    setSchema({ fields: newFields });

    handleEditField({ ...field, fields: newFields });
  };

  const handleRemoveField = (id) => {
    const filteredFields = schema.fields.filter((field) => field.id !== id);

    setSchema({ fields: [...filteredFields] });
  };

  const handleFieldEdit = (currField) => {
    const currFieldIndex = schema.fields.findIndex(
      (field) => field.id === currField.id
    );

    const newFields = [...schema.fields];
    newFields[currFieldIndex] = currField;

    setSchema({ fields: newFields });
    handleEditField({ ...field, fields: newFields });
  };

  return (
    <div className=" w-full">
      <div
        onMouseEnter={() => setShouldShowEditOptions(true)}
        onMouseLeave={() => setShouldShowEditOptions(false)}
        className={`flex items-center justify-between  w-full `}
      >
        <div className=" hover:bg-gray-200 py-4 border-b-2  px-2   flex items-center justify-between w-11/12">
          <div className="flex items-center ">
            <input
              value={currField?.name}
              onChange={(e) => {
                const newField = { ...currField, name: e.target.value };
                setCurrField(newField);
                handleEditField(newField);
              }}
              className="font-semibold focus:w-32 w-28  outline-none  bg-inherit focus:bg-white rounded px-1"
            />
            <select
              id="type-select"
              className="font-semibold uppercase bg-gray-200 rounded"
              value={currField?.type}
              onChange={(e) => {
                const newField = { ...currField, type: e.target.value };
                setCurrField(newField);
                handleEditField(newField);
              }}
            >
              <option value="string">String</option>
              <option value="integer">Integer</option>
              <option value="boolean">Boolean</option>
              <option value="object">Object</option>
              <option value="array">Array</option>
            </select>
          </div>
          {shouldShowEditOptions && (
            <div className="flex items-center gap-4 ">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="ml-3  font-medium">Required</div>
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={currField.isRequired}
                    onChange={(e) => {
                      const newField = {
                        ...currField,
                        isRequired: e.target.checked,
                      };
                      setCurrField(newField);
                      handleEditField(newField);
                    }}
                  />
                  <div
                    className={`block  w-12 h-6 rounded-full ${
                      currField.isRequired ? "bg-blue-500" : " bg-gray-400"
                    }`}
                  ></div>
                  <div
                    className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition ${
                      currField.isRequired ? "translate-x-6" : ""
                    }`}
                  ></div>
                </div>
              </label>
              {currField.type === "object" && (
                <button
                  onClick={() => onAddFieldButtonClick(field)}
                  className="bg-white p-1  rounded-lg"
                >
                  <Plus className="bg-white  rounded-lg w-4 h-4" />
                </button>
              )}
              <button onClick={() => onRemoveFieldButtonClick(field.id)}>
                <Trash2 className=" w-5 h-5 " />
              </button>
            </div>
          )}
        </div>
      </div>

      {schema?.fields?.length > 0 ? (
        <div className=" p-4 pr-0 ">
          {schema?.fields?.map((field, idx) => {
            return (
              <div key={field.id}>
                <div
                  className={` flex   
       
               `}
                >
                  <div
                    className={`  ${
                      schema?.fields?.length > 1 && "border-l"
                    }  mr-4 w-4 ${
                      schema?.fields?.length > 1 && idx === 0 && "border-t "
                    }
                ${
                  schema?.fields?.length > 1 &&
                  idx === schema.fields.length - 1 &&
                  "border-b"
                } `}
                  ></div>
                  <Item
                    field={field}
                    onRemoveFieldButtonClick={handleRemoveField}
                    handleEditField={handleFieldEdit}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default function Home() {
  const [schema, setSchema] = useState({
    fields: [],
  });
  const onAddFieldButtonClick = () => {
    const newField = {
      id: uuidv4(),
      name: "name",
      type: "string",
      isRequired: false,
    };

    setSchema({ fields: [...schema.fields, newField] });
  };

  const onRemoveFieldButtonClick = (id) => {
    const filteredFields = schema.fields.filter((field) => field.id !== id);

    setSchema({ fields: [...filteredFields] });
  };

  const handleEditField = (editedField) => {
    const editedFieldIndex = schema.fields.findIndex(
      (field, _) => field.id === editedField.id
    );

    schema.fields[editedFieldIndex] = editedField;
    setSchema({ fields: [...schema.fields] });

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "tree",
        JSON.stringify({ fields: [...schema.fields] })
      );
    }
  };

  const onSaveButtonClick = () => {
    console.log(schema);
  };

  return (
    <div className={`flex h-screen bg-[#F5F5F5]`}>
      <div className=" bg-white border-2 border-gray-300 shadow-md p-8 w-full max-w-2xl m-auto rounded-md ">
        <div className="bg-gray-50 p-4 space-y-4">
          <div className="flex justify-between items-center">
            <p className="font-bold text-gray-600 ">Feild name and type</p>
            <button
              onClick={() => onAddFieldButtonClick()}
              className="bg-white p-1 rounded-lg"
            >
              <Plus className="bg-white  rounded-lg w-5 h-5" />
            </button>
          </div>
          <main>
            {schema?.fields?.map((field, idx) => {
              return (
                <div key={field.id} className="flex  items-start  gap-4  ">
                  <p className="text-gray-400 py-4  ">{idx + 1}.</p>

                  <Item
                    field={field}
                    onRemoveFieldButtonClick={onRemoveFieldButtonClick}
                    handleEditField={handleEditField}
                  />
                </div>
              );
            })}
          </main>
          <div className=" flex justify-end ">
            <button
              onClick={() => onSaveButtonClick()}
              className=" font-medium  bg-gradient-to-bl from-[#0FC9F2] to-[#0F85F2] px-8 py-2 shadow-2xl   rounded-lg text-lg text-white"
            >
              <p>Save</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
