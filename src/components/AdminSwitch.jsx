import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function AdminSwitch({ author, company, params, action }) {

    const [isOn, setIsOn] = useState(author?.active || company?.active);
    const dispatch = useDispatch()

    function handleSwitch() {
        let data = {
            active: !isOn,
        };
        setIsOn(!isOn);
        dispatch(action({ id: params, data }))
    }

    return (
        <>
            <button type="button" onClick={handleSwitch} className={`flex relative w-5 h-3 rounded-full transition-colors duration-300 ${author?.active || company?.active ? 'bg-black' : 'bg-gray-400'}`} >
                <span className={`absolute inset-0 w-[0.5rem] h-[0.5rem] mt-[1.6px] ml-[0.12rem] bg-white rounded-full transition-transform duration-300 ${author?.active || company?.active ? 'transform translate-x-full' : ''}`} />
            </button>
        </>


    );

}