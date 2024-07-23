"use client"
import React, { useState } from 'react';
import Modal from 'react-modal';
import { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Trash2, Pencil, PlusCircle, X } from 'lucide-react';
import { Role, User } from "@prisma/client";
import { type FormData } from "../../schemas/userSchema";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    }
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#appmain');

// Required props
interface ICRUDModalRequiredProps {
    mtype: string;
}

// Optional props
interface ICRUDModalOptionalProps {
    data?: FormData;
}

// Combine required and optional props to build the full prop interface
interface ICRUDModalProps
    extends ICRUDModalRequiredProps,
    ICRUDModalOptionalProps { }

// Use the optional prop interface to define the default props
const defaultProps: ICRUDModalOptionalProps = {
    data: {
        id: "",
        name: '',
        email: '',
        image: '',
        role: Role.USER,
        primaryOrganisationId: '',
        enabled: true
    }
};

export default function CRUDModal(props: ICRUDModalProps) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [statusMessage, setSetStatusMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = handleSubmit(data => {
        startTransition(() => {
            const serveAction = async () => {
                // var res = await CRUDAction(props.mtype, data);
                // console.log(res)
                // setSetStatusMessage(res.status)
                closeModal();
            };
            serveAction();
        });
    });


    const handleDelete = () => {
        startTransition(() => {
            const serveAction = async () => {
                // var res = await CRUDAction(props.mtype, props.data!);
                // console.log(res)
                // setSetStatusMessage(res.status)
                closeModal();
            };
            serveAction();
        });
    };


    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function SwitchIcon(mtype: string) {
        switch (mtype) {
            case "add":
                return (<PlusCircle size={18}></PlusCircle>)
                break;
            case "edit":
                return (<Pencil size={18}></Pencil>)
                break;
            case "delete":
                return (<Trash2 size={18}></Trash2>)
                break;
            default:
                return (<p>na</p>)
        }

    }

    const [selectedRoleValue, setSelectedRoleValue] = useState<Role>(props.data?.role || Role.USER);
    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRoleValue(Role[event.target.value as keyof typeof Role]);
    };

    return (
        <div>
            <button onClick={openModal} >{SwitchIcon(props.mtype)}</button>

            <Modal
                isOpen={modalIsOpen}
                //   onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                className="crud-modal"
                overlayClassName="crud-modal-overlay"
                contentLabel="Modal">
                {(props.mtype == "add" || props.mtype == "edit") &&
                    <>
                        <form onSubmit={onSubmit}>
                            <div className='form-item'>
                                <input {...register('id')} placeholder={props.data?.id} type="hidden" defaultValue={props.data?.id} />
                            </div>
                            <div className='form-item'>
                                <label>Name</label>
                                <input {...register('name', { required: true })} defaultValue={props.data?.name ?? ''} />
                                {errors.name && <p>Name is required.</p>}
                            </div>
                            <div className='form-item'>
                                <label>email</label>
                                <input {...register('email', { required: true })} defaultValue={props.data?.email ?? ''} />
                                {errors.email && <p>email is required.</p>}
                            </div>
                            <div className='form-item'>
                                <label>Image Url</label>
                                <input {...register('image')} defaultValue={props.data?.image ?? ''} />
                            </div>
                            <div className='form-item'>
                                <label>Role</label>
                                <select {...register('role')} value={selectedRoleValue} onChange={handleRoleChange}>
                                    {Object.keys(Role).map(key => (
                                        <option key={key} value={Role[key as keyof typeof Role]}>
                                            {key}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='form-item mb-0'>
                                <input type="submit" />
                            </div>
                        </form>
                        <div> {statusMessage}</div>
                    </>
                }
                {props.mtype == "delete" &&
                    <div>
                        <h3 className='page-title'>Are you sure to delete?</h3>
                        <button className='delete-item' onClick={handleDelete}>Confirm Delete</button>
                    </div>
                }
                <button className='crud-modal-close' onClick={closeModal}><X /></button>
            </Modal>

        </div>
    );
}

