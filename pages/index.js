import { Plus, Trash2 } from "react-feather";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

const Item = ({ idx, item, removeItem, handleEdit }) => {
  const [showEditOptions, setShowEditOptions] = useState(false);

  const [currItem, setCurrItem] = useState(item);
  const [isRequired, setIsRequired] = useState(currItem?.isRequired);

  const [list, setList] = useState({ children: item.children });

  const clickHandler = (item) => {
    const newItem = {
      id: uuidv4(),
      name: "name",
      type: "string",
      isRequired: false,
    };

    setList({ children: [...list.children, newItem] });

    handleEdit({ ...item, children: [...list.children, newItem] });
  };

  const removeChildItem = (idx) => {
    const filterdItems = list.children.filter((_, index) => index !== idx);

    setList({ children: [...filterdItems] });
  };

  const handleChildEdit = (currItem) => {
    const childIndex = list.children.findIndex(
      (child) => child.id === currItem.id
    );

    const newChildren = [...list.children];
    newChildren[childIndex] = currItem;

    setList({ children: newChildren });
    handleEdit({ ...item, children: newChildren });
  };

  return (
    <div className=" w-full">
      <div
        onMouseEnter={() => setShowEditOptions(true)}
        onMouseLeave={() => setShowEditOptions(false)}
        className={`flex items-center justify-between  w-full `}
      >
        <div className=" hover:bg-gray-200 py-4 border-b-2  px-2   flex items-center justify-between w-11/12">
          <div className="flex items-center ">
            <input
              value={currItem?.name}
              onChange={(e) => {
                const newItem = { ...currItem, name: e.target.value };
                setCurrItem(newItem);
                handleEdit(newItem);
              }}
              className="font-semibold focus:w-32 w-28  outline-none  bg-inherit focus:bg-white rounded px-1"
            />
            <select
              id="type-select"
              className="font-semibold uppercase bg-gray-200 rounded"
              value={currItem?.type}
              onChange={(e) => {
                const newItem = { ...currItem, type: e.target.value };
                setCurrItem(newItem);
                handleEdit(newItem);
              }}
            >
              <option value="string">String</option>
              <option value="integer">Integer</option>
              <option value="boolean">Boolean</option>
              <option value="object">Object</option>
              <option value="array">Array</option>
            </select>
          </div>
          {showEditOptions && (
            <div className="flex items-center gap-4 ">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="ml-3  font-medium">Required</div>
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isRequired}
                    onChange={(e) => {
                      const newItem = {
                        ...currItem,
                        isRequired: e.target.checked,
                      };
                      setIsRequired(e.target.checked);
                      setCurrItem(newItem);
                      handleEdit(newItem);
                    }}
                  />
                  <div
                    className={`block  w-12 h-6 rounded-full ${
                      isRequired ? "bg-blue-500" : " bg-gray-400"
                    }`}
                  ></div>
                  <div
                    className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition ${
                      isRequired ? "translate-x-6" : ""
                    }`}
                  ></div>
                </div>
              </label>
              {currItem.type === "object" && (
                <button
                  onClick={() => clickHandler(item)}
                  className="bg-white p-1  rounded-lg"
                >
                  <Plus className="bg-white  rounded-lg w-4 h-4" />
                </button>
              )}
              <button onClick={() => removeItem(idx)}>
                <Trash2 className=" w-5 h-5 " />
              </button>
            </div>
          )}
        </div>
      </div>

      {list?.children?.length > 0 ? (
        <div className=" p-4 pr-0 ">
          {list?.children?.map((item, idx) => {
            return (
              <div key={idx}>
                <div
                  className={` flex   
       
               `}
                >
                  <div
                    className={`  ${
                      list?.children?.length > 1 && "border-l"
                    }  mr-4 w-4 ${
                      list?.children?.length > 1 && idx === 0 && "border-t "
                    }
                ${
                  list?.children?.length > 1 &&
                  idx === list.children.length - 1 &&
                  "border-b"
                } `}
                  ></div>
                  <Item
                    idx={idx}
                    item={item}
                    removeItem={removeChildItem}
                    handleEdit={handleChildEdit}
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
  const [list, setList] = useState({
    children: [
      {
        id: "person",
        name: "person",
        type: "object",
        isRequired: true,
        children: [
          {
            id: "name",
            name: "name",
            type: "object",
            isRequired: true,
            children: [
              {
                id: "firstName",
                name: "firstName",
                type: "string",
                isRequired: true,
              },
              {
                id: "lastName",
                name: "lastName",
                type: "string",
                isRequired: true,
              },
            ],
          },
          {
            id: "addName",
            name: "addName",
            type: "string",
            isRequired: false,
          },
        ],
      },
      {
        id: "order",
        name: "order",
        type: "string",
        isRequired: true,
      },
      {
        id: "class",
        name: "class",
        type: "boolean",
        isRequired: true,
      },
      {
        id: "general",
        name: "general",
        type: "boolean",
        isRequired: true,
      },
    ],
  });

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setList(JSON.parse(localStorage.getItem("tree")));
  //   }
  // }, []);

  const clickHandler = () => {
    const newItem = {
      name: "name",
      type: "string",
      isRequired: false,
    };

    setList({ children: [...list.children, newItem] });
  };

  const removeItem = (idx) => {
    const filterdItems = list.children.filter((_, index) => index !== idx);

    setList({ children: [...filterdItems] });
  };

  const handleEdit = (currItem) => {
    const itemIndex = list.children.findIndex(
      (habit, _) => habit.id === currItem.id
    );

    list.children[itemIndex] = currItem;
    setList({ children: [...list.children] });

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "tree",
        JSON.stringify({ children: [...list.children] })
      );
    }
  };

  return (
    <div className={`flex h-screen bg-[#F5F5F5]`}>
      <div className=" bg-white border-2 border-gray-300 shadow-md p-8 w-full max-w-2xl m-auto rounded-md ">
        <div className="bg-gray-50 p-4 space-y-4">
          <div className="flex justify-between items-center">
            <p className="font-bold text-gray-600 ">Feild name and type</p>
            <button
              onClick={() => clickHandler()}
              className="bg-white p-1 rounded-lg"
            >
              <Plus className="bg-white  rounded-lg w-5 h-5" />
            </button>
          </div>
          <main>
            {list?.children?.map((item, idx) => {
              return (
                <div key={idx} className="flex  items-start  gap-4  ">
                  <p className="text-gray-400 py-4  ">{idx + 1}.</p>

                  <Item
                    idx={idx}
                    item={item}
                    removeItem={removeItem}
                    handleEdit={handleEdit}
                  />
                </div>
              );
            })}
          </main>
        </div>
      </div>
    </div>
  );
}
