import { useState } from "react";

import InputText from "@/Components/Input/InputText";
import ErrorText from "@/Components/Typography/ErrorText";

import { addNewLead } from "@/app/context/lead";
import { useAppDispatch, useNotification } from "@/hooks";

const INITIAL_LEAD_OBJ = {
    first_name: "",
    last_name: "",
    email: "",
};

function AddLeadModalBody({ closeModal }: { closeModal: () => void }) {
    const dispatch = useAppDispatch();
    //const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
    const { Notify } = useNotification();

    const saveNewLead = () => {
        if (leadObj.first_name.trim() === "") return setErrorMessage("First Name is required!");
        else if (leadObj.email.trim() === "") return setErrorMessage("Email id is required!");
        else {
            const newLeadObj = {
                id: 7,
                email: leadObj.email,
                first_name: leadObj.first_name,
                last_name: leadObj.last_name,
                avatar: "https://reqres.in/img/faces/1-image.jpg",
            };
            dispatch(addNewLead({ newLeadObj }));
            Notify("Lead", "New Lead Added!");

            closeModal();
        }
    };

    const updateFormValue = ({ updateType, value }: UpdateFormValue) => {
        setErrorMessage("");
        setLeadObj({ ...leadObj, [updateType]: value });
    };

    return (
        <>
            <InputText
                type="text"
                defaultValue={leadObj.first_name}
                updateType="first_name"
                containerStyle="mt-4"
                labelTitle="First Name"
                updateFormValue={updateFormValue}
            />

            <InputText
                type="text"
                defaultValue={leadObj.last_name}
                updateType="last_name"
                containerStyle="mt-4"
                labelTitle="Last Name"
                updateFormValue={updateFormValue}
            />

            <InputText
                type="email"
                defaultValue={leadObj.email}
                updateType="email"
                containerStyle="mt-4"
                labelTitle="Email Id"
                updateFormValue={updateFormValue}
            />

            <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
            <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => closeModal()}>
                    Cancel
                </button>
                <button className="btn btn-primary px-6" onClick={() => saveNewLead()}>
                    Save
                </button>
            </div>
        </>
    );
}

export default AddLeadModalBody;
