import * as React from 'react';
import '../index.css'
import Modal from '@mui/material/Modal';
// import { Loader } from '.'
import { Operation, Product } from 'types';
import { createOperation, updateProducts } from '../../lib/services';

interface MyModalProps {
    open: boolean;
    trackedPO: {
        items: Product[];
        date: string;
        type: string;
        user: string;
    };
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function MyModal({ open, trackedPO, setOpen } : MyModalProps) {
    
    const closeModal = () => {
        setOpen(false)
    }

    const total = trackedPO.items.reduce((acc, curr) => {
        const quantity = curr.quantity;
        const price = curr.cost;

        return acc + quantity * price
    }, 0);

    const handleOperationSubmission = async (trackedPO: Operation) => {
        const items = trackedPO && trackedPO.items;
        try {
            const response = await createOperation(trackedPO);
            const updatingInventories = await updateProducts(items)
            setOpen(false);
            window.location.reload();
            return response; updatingInventories
        } catch (error) {
            console.log(error)
        }
    };
    
    return (
    <div>
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className='modal'>
                <div className="modal-content">
                    {trackedPO.items.length === 0 ? 
                        (<p className='empty-order-message'>Empty Order</p>) 
                            : 
                        (
                            <table className='cool-table '>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Size</th>
                                        <th>Quantity</th>
                                        <th>Sub total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {trackedPO.items.map((product) => (
                                        <tr key={product._id}>
                                            <td className='product-name'>{product.name}</td>
                                            <td>{product.size}</td>
                                            <td>{product.quantity}</td>
                                            <td>${(product.quantity * product.cost).toLocaleString()}</td>
                                        </tr>

                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>Total:</td>
                                        <td></td>
                                        <td></td>
                                        <td className='outgoing-cash'>${total.toLocaleString()}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        )}
                        <div className='modal-btns'>
                            {trackedPO.items.length === 0 
                                ? 
                                    (<button className='btn' onClick={closeModal}>Close</button>) 
                                : 
                                    (<button className='btn' onClick={() => handleOperationSubmission(trackedPO)}> Confirm Purchase</button>)
                            }
                        </div>
                </div>
            </div>
        </Modal>
    </div>
    );
}