import { useState } from "react";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";

import { Action } from "@/types/action";

export default function CheckDatum(props: { onDeposit: Action; onWithdraw: Action }) {
  const { onDeposit, onWithdraw } = props;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [lovelace, setLovelace] = useState(0n);

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      <Button onPress={onOpen} className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" radius="full">
        Deposit
      </Button>

      <Button onPress={onWithdraw} className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" radius="full">
        Withdraw
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Deposit</ModalHeader>
              <ModalBody>
                <Input
                  type="number"
                  label="Quantity"
                  placeholder="0.000000"
                  variant="bordered"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">ADA</span>
                    </div>
                  }
                  onValueChange={(value: string) => setLovelace(BigInt(parseFloat(value) * 1_000000))}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={() => onDeposit(lovelace).then(onClose)}
                  className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                  radius="full"
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
