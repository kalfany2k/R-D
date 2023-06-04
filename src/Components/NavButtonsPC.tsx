import ColorModeSwitch from "./ColorModeSwitch";
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, useDisclosure } from "@chakra-ui/react";
import HowItWorks from "./HowItWorks";
import BecomePartner from "./BecomeaPartner";

export const navOptionList = [  "Log in"];

const NavButtonsPC = () => {

  const {isOpen:isHowitWorksOpen, onOpen:onHowItWorksOpen, onClose:onHowItWorksClose}=useDisclosure();
  const{isOpen:isBecomePartnerOpen,onOpen:onBecomePartnerOpen,onClose:onBecomePartnerClose}=useDisclosure();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "600px",
      }}
    >
          <ColorModeSwitch />
      <Text fontSize="1xl" fontWeight="semibold" onClick={onHowItWorksOpen}>
        How it works
      </Text>
      <Text fontSize="1xl" fontWeight="semibold" onClick={onBecomePartnerOpen}>
        Become a partner
      </Text>

      {navOptionList.map((option) => {
        return (
          <Text key={option} fontSize="1xl" fontWeight="semibold">
            {option}
          </Text>
        );
      })}

      <Modal isOpen={isHowitWorksOpen} onClose={onHowItWorksClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>How It Works</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HowItWorks />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isBecomePartnerOpen} onClose={onBecomePartnerClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Become a Partner</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <BecomePartner />
          </ModalBody>
        </ModalContent>
      </Modal>


      <Button size="md" colorScheme="green">
        Sell tickets
      </Button>
    </div>
  );
};

export default NavButtonsPC;