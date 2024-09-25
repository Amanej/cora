'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle, Trash2 } from 'lucide-react'
import SideBar, { SidebarPage } from '@/components/global/Sidebar'
import { addPhoneNumberRequest } from './api'

interface Contact {
    id: number;
    name: string;
    phoneNumber: string;
}

const PhoneNumberDashboard = () => {
    const [contacts, setContacts] = useState<Contact[]>([
        { id: 1, name: "Ola Nordmann", phoneNumber: "+47 123 45 678" },
        { id: 2, name: "Kari Nordmann", phoneNumber: "+47 987 65 432" },
        { id: 3, name: "Per Hansen", phoneNumber: "+47 456 78 901" },
    ]);
    const [newName, setNewName] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddContact = async (e: React.FormEvent) => {
        e.preventDefault();
        /*
        if (newName.trim() !== '' && newPhoneNumber.trim() !== '') {
            setContacts([...contacts, {
                id: contacts.length + 1,
                name: newName.trim(),
                phoneNumber: newPhoneNumber.trim()
            }]);
            setNewName('');
            setNewPhoneNumber('');
            setIsDialogOpen(false);
        }*/
        await addPhoneNumberRequest(newName, newPhoneNumber);
    };

    const handleRemoveContact = (id: number) => {
        setContacts(contacts.filter(contact => contact.id !== id));
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <SideBar currentPage={SidebarPage.PhoneNumbers} />

            {/* Main content */}
            <main className="flex-1 p-8 overflow-auto">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-black">Telefonnumre</h1>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <PlusCircle className="h-5 w-5 mr-2" />
                                    Legg til nytt telefonnummer
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white">
                                <DialogHeader>
                                    <DialogTitle className="text-black">Legg til ny kontakt</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleAddContact} className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Navn</label>
                                        <Input
                                            id="name"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            placeholder="Ola Nordmann"
                                            className="text-black"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Telefonnummer</label>
                                        <Input
                                            id="phoneNumber"
                                            value={newPhoneNumber}
                                            onChange={(e) => setNewPhoneNumber(e.target.value)}
                                            placeholder="+47 000 00 000"
                                            required
                                            className="text-black"
                                        />
                                    </div>
                                    <Button type="submit" className="w-full">Legg til</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Table className="bg-white">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Navn</TableHead>
                                <TableHead>Telefonnummer</TableHead>
                                <TableHead className="text-right">Handling</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="text-gray-700">
                            {contacts.map((contact) => (
                                <TableRow key={contact.id}>
                                    <TableCell className="font-medium">{contact.name}</TableCell>
                                    <TableCell>{contact.phoneNumber}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleRemoveContact(contact.id)}
                                            className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                        >
                                            <Trash2 className="h-5 w-5 mr-2" />
                                            Slett
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </main>
        </div>
    )
}

export default PhoneNumberDashboard