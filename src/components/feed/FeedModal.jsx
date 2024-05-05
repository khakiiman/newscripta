import { useState, useEffect } from "react";

import { toast } from "sonner";

import { getDataFromSessionStorage, storeDataInSessionStorage } from "../../utils/helper";
import { setUserInfo } from "../../firebase";

import Modal from "../common/Modal";
import InlineSpinner from "../spinner/inline/InlineSpinner";

const options = [
    {title: 'Art and design', id: 'artanddesign'},
    {title: 'Business', id: 'business'},
    {title: 'Books', id: 'books'},
    {title: 'Cities', id: 'cities'},
    {title: 'Education', id: 'education'},
    {title: 'Environment', id: 'environment'}, 
    {title: 'Fashion', id: 'fashion'},
    {title: 'Games', id: 'games'}, 
    {title: 'Life and style', id: 'lifeandstyle'}, 
    {title: 'Music', id: 'music'},
    {title: 'Politics', id: 'politics'}, 
    {title: 'Science', id: 'science'},
    {title: 'Sport', id: 'sport'}, 
    {title: 'Technology', id: 'technology'},
    {title: 'From the Guardian', id: 'theguardian'}, 
    {title: 'From the Observer', id: 'theobserver'}, 
    {title: 'Travel', id: 'travel'},
    {title: 'Television & radio', id: 'tv-and-radio'},
    {title: 'Weather', id: 'weather'},
    {title: "Women in Leadership", id: "women-in-leadership"},
]

const FeedModal = ({
  isOpen,
  closeModal,
}) => {

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    const data = getDataFromSessionStorage('user');
    setUserData(data);
    if(data?.feedOptions) {
      let options = data.feedOptions.map( option => option.id);
      setSelectedOptions(options);
    }
  },[]);

  const toggleSelectedOptions = (optionId) => {
    if(!isLoading) {
      if (selectedOptions.includes(optionId)) {
        const newOptions = selectedOptions.filter((id) => id !== optionId);
        setSelectedOptions(newOptions);
      } else {
        const newOptions = [...selectedOptions, optionId];
        setSelectedOptions(newOptions);
      }
    }
  };
  
  const extractSelectedOptions = () => {
    const dataMap = {};
    options.forEach(item => {
    dataMap[item.id] = item;
    });
    let selectedData = [];
    selectedOptions.forEach(selectedId => {
      if (dataMap[selectedId]) {
        selectedData.push({
          title: dataMap[selectedId].title,
          id: selectedId,
        });
      }
    });
    return selectedData;
  }
  const handleSubmit = () => {
    console.log(userData.email);
    setIsLoading(true);
    setUserInfo(userData.email, {
      feedOptions: extractSelectedOptions()
    })
    .then( res => {
      console.log("hello")
      storeDataInSessionStorage('user',res);
      window.dispatchEvent( new Event('storage') );
      toast.success("Success!");
      closeModal();
    })
    .catch(e => {
      toast.error("Something went wrong!");
    })
    .finally(()=>{
      setIsLoading(false);
    })
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="bg-white bg-opacity-80 p-6 space-y-4">
        <h3 className="text-3xl font-semibold text-gray-900">
          Personalize Your Feed:
        </h3>
        <div className="flex flex-wrap gap-4 ">
          {options.map((option, index)=>(
            
            <div className={`
              cursor-pointer rounded-3xl py-3 px-4 text-[18px] hover:scale-95
              ${selectedOptions.includes(option.id) ? "bg-gray-900 bg-opacity-80 text-white": "bg-stone-50 text-gray-900"}`
              }
              onClick={() => toggleSelectedOptions(option.id)}
              key={index}
              >
                  {option.title}
              </div>
              
          ))}
        </div>
        <div className="flex mt-8 justify-end space-x-2">
          <button
            type="button"
            className="inline-flex justify-center rounded-md bg-white text-dark-blue border px-6 py-2 text-sm font-medium hover:bg-gray-100 disabled:opacity-80"
            onClick={closeModal}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md bg-gray-600 text-white border-gray-600 px-6 py-2 text-sm font-medium disabled:opacity-80 gap-2"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading && <InlineSpinner />}
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FeedModal;
