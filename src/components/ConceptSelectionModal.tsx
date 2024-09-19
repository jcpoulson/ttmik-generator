import { useState, useEffect, useContext } from "react";
import getConcepts from "../app/api/firebase/getConcepts"
import { Box, Typography, Modal, SelectChangeEvent, FormControl, InputLabel, Select, OutlinedInput, MenuItem, Checkbox, ListItemText, Button } from "@mui/material"
import { AppContext } from "@/context/AppContext";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Props = { 
    open: boolean,  
    handleClose: () => void,
    startSession: () => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ConceptSelectionModal: React.FC<Props> = ({ open, handleClose, startSession }) => {
    const [concepts, setConcepts] = useState<any>([]);
    const [selectedConcepts, setLocalSelectedConcepts] = useState<string[]>([]);
    const { setSelectedConcepts } = useContext(AppContext)

    useEffect(() => {
        const fetchConcepts = async () => {
            const request = await getConcepts();
            setConcepts(request);
        }
        fetchConcepts()
    }, [])

    const handleChange = (event: SelectChangeEvent<typeof concepts>) => {
        const {
            target: { value },
        } = event;
        setLocalSelectedConcepts(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Select concepts to practice
            </Typography>
            

            <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Concepts</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={selectedConcepts}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {
                            concepts.map((concept: any) => (
                                <MenuItem key={concept.korean} value={concept.korean}>
                                    <Checkbox checked={selectedConcepts.includes(concept.korean)} />
                                    <ListItemText primary={concept.korean} />
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </div>
            <Button variant="contained" onClick={() => {
                startSession();
                const formattedConcepts = concepts.filter((concept: any, index: number) => {
                    if (selectedConcepts.includes(concept.korean)) {
                        return concept
                    }
                })
                setSelectedConcepts(formattedConcepts) // Global selected concepts
            }}>
                Start Session
            </Button>
            </Box>
        </Modal>
        </div>
    );
}

export default ConceptSelectionModal;
