'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from 'lucide-react'
import { Dialog, DialogTitle, DialogHeader, DialogContent } from '@/components/ui/dialog'
import { AgentStructuredSummaryFields } from '../../types'

type FieldType = 'string' | 'boolean' | 'number'

interface Field {
    name: string
    type: FieldType
    description: string
    required: boolean
}

type Props = {  
    structuredSummary: AgentStructuredSummaryFields[] | undefined;
    setStructuredSummary: (structuredSummary: AgentStructuredSummaryFields[] | undefined) => void;
}

const AgentStructuredSummary = ({ structuredSummary, setStructuredSummary }: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [fields, setFields] = useState<Field[]>([])
    const [newField, setNewField] = useState<Field>({
        name: '',
        type: 'string',
        description: '',
        required: false
    })

    const addField = () => {
        if (newField.name) {
            setFields([...fields, newField])
            setNewField({ name: '', type: 'string', description: '', required: false })
        }
    }

    const removeField = (index: number) => {
        setFields(fields.filter((_, i) => i !== index))
    }

    return (
        <div className="container max-w-2xl">

            <Dialog open={isOpen} onOpenChange={() => { setIsOpen(false) }}>
                <DialogContent className="bg-white text-gray-800">
                    <DialogHeader>
                        <DialogTitle className="text-gray-800">Add new field</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="fieldName" className="text-gray-800">Field Name</Label>
                                <Input
                                    id="fieldName"
                                    value={newField.name}
                                    onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                                    placeholder="Enter field name"
                                    className="text-gray-800"
                                />
                            </div>
                            <div>
                                <Label htmlFor="fieldType" className="text-gray-800">Field Type</Label>
                                <Select
                                    value={newField.type}
                                    onValueChange={(value: FieldType) => setNewField({ ...newField, type: value })}
                                >
                                    <SelectTrigger id="fieldType" className="text-gray-800">
                                        <SelectValue placeholder="Select field type" className="text-gray-800" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="string">String</SelectItem>
                                        <SelectItem value="boolean">Boolean</SelectItem>
                                        <SelectItem value="number">Number</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="fieldDescription" className="text-gray-800">Description</Label>
                            <Input
                                id="fieldDescription"
                                value={newField.description}
                                onChange={(e) => setNewField({ ...newField, description: e.target.value })}
                                placeholder="Enter field description"
                                className="text-gray-800"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="fieldRequired"
                                checked={newField.required}
                                onCheckedChange={(checked) => setNewField({ ...newField, required: checked as boolean })}
                                className="text-gray-800"
                            />
                            <Label htmlFor="fieldRequired" className="text-gray-800">Required</Label>
                        </div>
                        <Button onClick={() => {
                            addField()
                            setIsOpen(false)
                            // @TODO - update structuredSummary and feed structured summary to fields
                        }}>Add Field</Button>
                    </div>

                </DialogContent>
            </Dialog>

            <Card>
                <CardHeader className="flex justify-between flex-row">
                    <Label>Structured Summary</Label>
                </CardHeader>
                <CardContent>
                    {fields.length === 0 ? (
                        <p className="text-center text-muted-foreground">No fields added yet.</p>
                    ) : (
                        <ul className="space-y-4">
                            {fields.map((field, index) => (
                                <li key={index} className="flex items-center justify-between bg-secondary p-3 rounded-md">
                                    <div>
                                        <strong>{field.name}</strong> ({field.type})
                                        {field.required && <span className="ml-2 text-sm text-red-500">Required</span>}
                                        <p className="text-sm text-muted-foreground">{field.description}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => removeField(index)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="flex justify-end mt-4">
                        <Button variant="outline" onClick={() => setIsOpen(true)}>Add Field</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AgentStructuredSummary