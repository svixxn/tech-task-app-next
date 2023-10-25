import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from "@nextui-org/react";

type Props = {
  title: string;
  onDelete: () => void;
  isShowModal: boolean;
  setIsShowModal: (isShowModal: boolean) => void;
};

const DeleteModal = ({
  title,
  onDelete,
  isShowModal,
  setIsShowModal,
}: Props) => {
  const handleDelete = () => {
    onDelete();
    setIsShowModal(false);
  };
  return (
    <>
      <Modal isOpen={isShowModal} placement="center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-lg font-bold">Delete Task</h3>
          </ModalHeader>
          <ModalBody>
            <p>
              Are you sure you want to delete task{" "}
              <span className="font-bold">
                {title.length > 10 ? title.slice(0, 10) + "..." : title}
              </span>
              ?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              variant="light"
              onPress={() => setIsShowModal(false)}
            >
              Close
            </Button>
            <Button color="danger" onPress={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
