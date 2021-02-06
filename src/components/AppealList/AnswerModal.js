import { XmlEditor } from "react-xml-editor";
import filterDocSpec from "../../constants/filterDocSpec"
import BaseModal from "../../shared/ContextAwareToggle/BaseModal";


const AnswerModal = ({answer, show, close}) => {
    return (
        <BaseModal
            show={show}
            close={close}
            title={"Create rescript"}
            buttonTitle={"Close"}
            onSubmit={close}
        >
            <XmlEditor
                mode={'laic'}
                docSpec={ filterDocSpec }
                xml={answer}
            />
        </BaseModal>
    )
}

export default AnswerModal;