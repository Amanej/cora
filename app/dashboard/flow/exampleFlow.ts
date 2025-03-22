const NODES =[
    {
        "id": "1",
        "type": "input",
        "data": {
            "label": "Welcome"
        },
        "position": {
            "x": 123,
            "y": -91
        },
        "width": 150,
        "height": 40,
        "selected": false,
        "positionAbsolute": {
            "x": 123,
            "y": -91
        },
        "dragging": false
    },
    {
        "id": "2",
        "data": {
            "label": "FindCustomer"
        },
        "position": {
            "x": 121.3698650409149,
            "y": 22.391967652135065
        },
        "width": 150,
        "height": 40,
        "selected": false,
        "positionAbsolute": {
            "x": 121.3698650409149,
            "y": 22.391967652135065
        },
        "dragging": false
    },
    {
        "id": "3",
        "data": {
            "label": "FoundCustomer"
        },
        "position": {
            "x": 273.2686793051634,
            "y": 136.84215617169934
        },
        "width": 150,
        "height": 40,
        "selected": false,
        "positionAbsolute": {
            "x": 273.2686793051634,
            "y": 136.84215617169934
        },
        "dragging": false
    },
    {
        "id": "4",
        "data": {
            "label": "Did not find"
        },
        "position": {
            "x": -33.65628105342084,
            "y": 132.68711547239627
        },
        "width": 150,
        "height": 40,
        "selected": false,
        "positionAbsolute": {
            "x": -33.65628105342084,
            "y": 132.68711547239627
        },
        "dragging": false
    },
    {
        "id": "5",
        "data": {
            "label": "VerifyCustomer"
        },
        "position": {
            "x": 274.37671165302834,
            "y": 269.25218295193883
        },
        "width": 150,
        "height": 40,
        "selected": false,
        "positionAbsolute": {
            "x": 274.37671165302834,
            "y": 269.25218295193883
        },
        "dragging": false
    },
    {
        "id": "6",
        "data": {
            "label": "Customer Verified"
        },
        "position": {
            "x": 476.72293677389933,
            "y": 416.0830688564139
        },
        "width": 150,
        "height": 40,
        "selected": false,
        "positionAbsolute": {
            "x": 476.72293677389933,
            "y": 416.0830688564139
        },
        "dragging": false
    },
    {
        "id": "7",
        "data": {
            "label": "Not Verified"
        },
        "position": {
            "x": 129.27739730220947,
            "y": 410.08273478030526
        },
        "width": 150,
        "height": 40,
        "selected": false,
        "positionAbsolute": {
            "x": 129.27739730220947,
            "y": 410.08273478030526
        },
        "dragging": false
    },
    {
        "id": "8",
        "data": {
            "label": "Explain Debt"
        },
        "position": {
            "x": 475.7699779004732,
            "y": 569.8366964145231
        },
        "width": 150,
        "height": 40,
        "selected": false,
        "positionAbsolute": {
            "x": 475.7699779004732,
            "y": 569.8366964145231
        },
        "dragging": false
    },
    {
        "id": "9",
        "data": {
            "label": "Request Payment"
        },
        "position": {
            "x": 474.8003586733157,
            "y": 703.9687788191661
        },
        "width": 150,
        "height": 40,
        "selected": false,
        "positionAbsolute": {
            "x": 474.8003586733157,
            "y": 703.9687788191661
        },
        "dragging": false
    },
    {
        "id": "10",
        "data": {
            "label": "AcceptPayment ()"
        },
        "position": {
            "x": 665.8299908103793,
            "y": 857.6469453804242
        },
        "width": 150,
        "height": 40,
        "selected": false,
        "positionAbsolute": {
            "x": 665.8299908103793,
            "y": 857.6469453804242
        },
        "dragging": false
    },
    {
        "id": "11",
        "data": {
            "label": "DenyPayment"
        },
        "position": {
            "x": 306.47073949276756,
            "y": 856.2562994729553
        },
        "width": 150,
        "height": 40,
        "selected": false,
        "positionAbsolute": {
            "x": 306.47073949276756,
            "y": 856.2562994729553
        },
        "dragging": false
    },
    {
        "id": "12",
        "data": {
            "label": "Explain options"
        },
        "position": {
            "x": 303.9038876976417,
            "y": 1011.44361306816
        },
        "width": 150,
        "height": 40,
        "selected": false,
        "dragging": false,
        "positionAbsolute": {
            "x": 303.9038876976417,
            "y": 1011.44361306816
        }
    },
    {
        "id": "13",
        "data": {
            "label": "Succesful payment"
        },
        "position": {
            "x": 777.4880438983515,
            "y": 1007.4861153655652
        },
        "width": 150,
        "height": 40,
        "selected": false,
        "positionAbsolute": {
            "x": 777.4880438983515,
            "y": 1007.4861153655652
        },
        "dragging": false
    },
    {
        "id": "14",
        "data": {
            "label": "Failed payment"
        },
        "position": {
            "x": 561.8724931077844,
            "y": 1008.662321253222
        },
        "width": 150,
        "height": 40,
        "selected": false,
        "positionAbsolute": {
            "x": 561.8724931077844,
            "y": 1008.662321253222
        },
        "dragging": false
    },
    {
        "id": "15",
        "data": {
            "label": "Find Customer By SSN"
        },
        "position": {
            "x": -302,
            "y": 280.4
        },
        "width": 150,
        "height": 40,
        "selected": false,
        "positionAbsolute": {
            "x": -302,
            "y": 280.4
        },
        "dragging": false
    },
    {
        "id": "16",
        "data": {
            "label": "EndConversation"
        },
        "position": {
            "x": 474,
            "y": 1206
        },
        "width": 150,
        "height": 40,
        "selected": true,
        "positionAbsolute": {
            "x": 474,
            "y": 1206
        },
        "dragging": false
    }
];

const EDGES = [
    {
        "id": "e1-2",
        "source": "1",
        "target": "2"
    },
    {
        "source": "2",
        "sourceHandle": null,
        "target": "3",
        "targetHandle": null,
        "id": "reactflow__edge-2-3"
    },
    {
        "source": "2",
        "sourceHandle": null,
        "target": "4",
        "targetHandle": null,
        "id": "reactflow__edge-2-4"
    },
    {
        "source": "5",
        "sourceHandle": null,
        "target": "6",
        "targetHandle": null,
        "id": "reactflow__edge-5-6"
    },
    {
        "source": "5",
        "sourceHandle": null,
        "target": "7",
        "targetHandle": null,
        "id": "reactflow__edge-5-7"
    },
    {
        "source": "7",
        "sourceHandle": null,
        "target": "5",
        "targetHandle": null,
        "id": "reactflow__edge-7-5"
    },
    {
        "source": "3",
        "sourceHandle": null,
        "target": "5",
        "targetHandle": null,
        "id": "reactflow__edge-3-5"
    },
    {
        "source": "6",
        "sourceHandle": null,
        "target": "8",
        "targetHandle": null,
        "id": "reactflow__edge-6-8"
    },
    {
        "source": "8",
        "sourceHandle": null,
        "target": "9",
        "targetHandle": null,
        "id": "reactflow__edge-8-9"
    },
    {
        "source": "9",
        "sourceHandle": null,
        "target": "10",
        "targetHandle": null,
        "id": "reactflow__edge-9-10"
    },
    {
        "source": "9",
        "sourceHandle": null,
        "target": "11",
        "targetHandle": null,
        "id": "reactflow__edge-9-11"
    },
    {
        "source": "10",
        "sourceHandle": null,
        "target": "14",
        "targetHandle": null,
        "id": "reactflow__edge-10-14"
    },
    {
        "source": "10",
        "sourceHandle": null,
        "target": "13",
        "targetHandle": null,
        "id": "reactflow__edge-10-13"
    },
    {
        "source": "14",
        "sourceHandle": null,
        "target": "10",
        "targetHandle": null,
        "id": "reactflow__edge-14-10"
    },
    {
        "source": "11",
        "sourceHandle": null,
        "target": "12",
        "targetHandle": null,
        "id": "reactflow__edge-11-12"
    },
    {
        "source": "4",
        "sourceHandle": null,
        "target": "15",
        "targetHandle": null,
        "id": "reactflow__edge-4-15"
    },
    {
        "source": "15",
        "sourceHandle": null,
        "target": "4",
        "targetHandle": null,
        "id": "reactflow__edge-15-4"
    },
    {
        "source": "13",
        "sourceHandle": null,
        "target": "16",
        "targetHandle": null,
        "id": "reactflow__edge-13-16"
    },
    {
        "source": "12",
        "sourceHandle": null,
        "target": "16",
        "targetHandle": null,
        "id": "reactflow__edge-12-16"
    }
]