import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import classes from "./InvestModal.module.scss"
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ClipLoader } from 'react-spinners';
import axios from "../../axios"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '400',
  width: "92%",
  bgcolor: 'white',
  borderRadius: "7px",
  p: 4,
  outline: "none",
};

export default function InvestModal(props) {
  const [amount, setamount] = React.useState('')
  const submitBtn = React.useRef(null)
  const [issubmitting, setissubmitting] = React.useState("submit")
  let available_amounts = [
    100, 200, 500, 1000, 2000, 5000,
    10000, 20000, 50000,
    100000, 500000, 1000000
  ]

  let writeToClipboard = () => {
    window.navigator.clipboard.writeText("TPwE1V1SSTyC16Hryz2WZyyZLcNYQyf8j3")
  }

  async function handleSubmit(e){
    e.preventDefault()
    submitBtn.current.disabled = true
    setissubmitting("submitting")
    console.log(props.id)
    await axios.post("/transactions", {
        userId: props.id, type: "deposit", amount
    })
    .then(() => {
      setissubmitting("submitted")
    },
    err => console.log(err.response))
  }

  return (
    <div className={classes.investmodal}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.invest}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.invest}>
          <Box sx={style} >
            {/* <Typography id="transition-modal-title" variant="h6" component="h4">
              
            </Typography> */}
            <Typography 
              fontWeight={700} 
              variant='primary'
              component={"h3"}
              textAlign={"center"}
            >
              Top up
            </Typography>
            <br />
            <Typography variant='secondary' component={"h4"} textAlign={"left"} fontWeight={600}>
              Guidelines
            </Typography>
            <ol style={{margin: "10px 0px 10px 20px"}}>
              <li style={{marginBottom: "10px"}}>Select investment amount</li>
              <li style={{marginBottom: "10px"}}>Send amount to the given trx wallet address</li>
              <li style={{marginBottom: "10px"}}>Click <strong>SUBMIT</strong> button to notify the Dailymoney for the action</li>
            </ol>
            <br />
            <Typography variant='secondary' component={"h4"} textAlign={"left"} fontWeight={600}>
              -- Select investment amount
            </Typography>
            <br />
            <form onSubmit={(e) => handleSubmit(e)}>
              <FormControl fullWidth>
                <InputLabel id="amount">Amount</InputLabel>
                <Select
                  labelId="amount"
                  id="select-amount"
                  value={amount}
                  label="amount"
                  required
                  onChange={(e) => setamount(e.target.value)}
                >
                  {available_amounts.map((amount, i) => (
                    <MenuItem 
                      key={i} 
                      value={amount}
                    >
                          <strong style={{fontWeight: "800"}}>{new Intl.NumberFormat().format(amount)} $</strong>
                    </MenuItem>
                  ))}
                </Select> 
              </FormControl>
                <br />
                <Typography variant='secondary' margin={"40px 0px 10px"} component={"h4"} textAlign={"left"} fontWeight={600}>
                -- Send to this Trx wallet Address
                </Typography>              
                <Typography variant='primary' marginBottom={"10px"} fontWeight={700} component={"h5"} fontSize={".9em"}>
                  TPwE1V1SSTyC16Hryz2WZyyZLcNYQyf8j3
                </Typography>
                <Button onClick={() => writeToClipboard()} variant='contained'color='warning' sx={{fontWeight: "600", width: "150px"}}>COPY ADDRESS</Button>
                <br />
                <br />
                <Typography variant='secondary' margin={"20px 0 10px"} component={"h4"} textAlign={"left"} fontWeight={600}>
                -- Submit to Dailymoney
                </Typography> 
                <Button fullWidth 
                    ref={submitBtn}
                    type='submit' 
                    variant= {issubmitting === "submitted" ? "success" : "contained"}
                    color='primary' 
                    sx={{fontWeight: "700",height: "45px"}}
                >
                  {issubmitting === "submitted" ?
                  "Submitted" 
                  : issubmitting === "submitting" ?
                  <span 
                    style={{display: "flex", justifyContent: "center", "alignItems": "center"}}
                    >
                    <ClipLoader size={20} color='white'/>
                  </span>
                  : "Submit"
                  }
                </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}