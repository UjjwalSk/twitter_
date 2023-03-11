import React from 'react';
import "./Popup.css"

const Popup = (props) => {
    return (
        <div>
            {
                props.popup != -1 && <div className="popup h-[150%] overflow-scroll">
                    <div className='popup_inner rounded-lg p-7 overflow-y-scroll'>
                        <div>
                            <h1 className='text-2xl font-bold inline-block'>
                                Tweet Details
                            </h1>
                            <button onClick={() => props.setPopup(-1)}>Close</button>
                        </div><br />
                        <table className='w-full'>
                            {
                                props.data && <>
                                    {
                                        Object.keys(props.data).map((e) => {
                                            return (
                                                e != "_id" && e != "longitude" && e != "latitude" && <tr className='border'>
                                                    <td className='font-bold p-4 border'>{e[0].toUpperCase() + e.substr(1,)}</td>
                                                    <td className='p-2'>{props.data[e] ? props.data[e] : "---"}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </>
                            }
                        </table>
                    </div>
                </div>
            }
        </div>
    )
}

export default Popup
