import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

function Filter() {
    const [types, setTypes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Fetch the list of Pokémon types from the PokeAPI
        fetch('https://pokeapi.co/api/v2/type/')
            .then(response => response.json())
            .then(data => {
                const typeData = data.results;
                setTypes(typeData);
            })
            .catch(error => {
                console.error('Error fetching Pokémon types:', error);
            });
    }, []);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div>
            <button
                className="typeButton"
                onClick={() => {
                    toggleModal();
                }}
            >
                TYPE FILTER
            </button>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={toggleModal}
                contentLabel="Pokémon Types"               
            >
                <div className="Typs">
                <h2>Pokémon Types</h2>
                <div >
                    {types.map(type => (
                        <button
                            key={type.name}
                            className="Modal-button"
                            onClick={() => {
                                alert(`You clicked the ${type.name} type button.`);
                            }}
                        >
                            {type.name}
                        </button>
                    ))}
                </div>
                <button className='close' onClick={toggleModal}>Close</button>
                </div>
            </Modal>
        </div>
    );
}

export default Filter;
