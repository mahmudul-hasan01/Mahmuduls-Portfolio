"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import ContactForm from "./ContactForm";
import FloatingMessageButton from "./FloatingMessageButton";

interface ContactFormContextType {
  openForm: () => void;
}

const ContactFormContext = createContext<ContactFormContextType>({
  openForm: () => {},
});

export const useContactForm = () => useContext(ContactFormContext);

export default function ContactFormWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [formOpen, setFormOpen] = useState(false);

  const openForm = useCallback(() => setFormOpen(true), []);
  const closeForm = useCallback(() => setFormOpen(false), []);

  return (
    <ContactFormContext.Provider value={{ openForm }}>
      {children}
      <FloatingMessageButton onClick={openForm} />
      <ContactForm isOpen={formOpen} onClose={closeForm} />
    </ContactFormContext.Provider>
  );
}
