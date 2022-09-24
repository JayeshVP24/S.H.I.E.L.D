import { Box, Button, Container, Heading, Input, ModalBody, ModalFooter, ModalHeader, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import { HamburgerIcon } from '@chakra-ui/icons'
import { auth } from '../firebase'
import { useRouter } from "next/router"


import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import React, { useEffect, useState } from "react"
import LoginModal from "./LoginModal"
import { onAuthStateChanged, signOut } from "firebase/auth"





const Navbar: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isOpenmodal, onOpen: onOpenmodal, onClose: onClosemodal } = useDisclosure()
    const btnRef = React.useRef()
    const router = useRouter()
    const [user, setUser] = useState<boolean>(false)
    useEffect(() => {
        console.log("hello???")
        // setUser(!!auth.currentUser)
        console.log("current user: ", user)

        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              setUser(true)
              // ...
            } else {
              // User is signed out
              // ...
              setUser(false)
            }
          });
    },[])


      

    // function onSigninSubmit() {
    //     const phoneNumber = "+91" + number;
    //     const appVerifier = window.recaptchaVerifier;
    //     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    //         .then((confirmationResult) => {
    //             // SMS sent. Prompt user to type the code f
                
    //             rom the message, then sign the
    //             // user in with confirmationResult.confirm(code).
    //             window.confirmationResult = confirmationResult;
    //             alert("otp sended")
    //             // ...
    //         }).catch((error) => {
    //             // Error; SMS not sent

    //         });
    // }


    // function verifyotp() {
    //     window.confirmationResult.confirm(otp).then((result) => {
    //         // User signed in successfully.
    //         const user = result.user;
    //         // ...
    //     }).catch((error) => {
    //         // User couldn't sign in (bad verification code?)
    //         // ...
    //     });

    // }

    const handleCommunity = ()=>{
            router.push('/community')
    }

    const handleSignout = () => {
        signOut(auth).then(() => {
            console.log("logout done")
        }).catch(() => {
            console.log("error in logout")
        })

    }

    return (
        <>
            <Box p={3} zIndex="docked" rounded={"2xl"} alignItems="center" w="96" mx={"auto"} bg={"aqua"} display="flex" position="fixed" top="5" left="0" justifyContent={"space-between"} >
                <Box>
                    <Heading fontSize={"20px"}>S.H.I.E.L.D</Heading>
                </Box>
                <Button bg="aqua" onClick={onOpen} ref={btnRef} display={"flex"}>
                    <HamburgerIcon h={7} w={7} />
                </Button>

            </Box>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>S.H.I.E.L.D</DrawerHeader>

                    <DrawerBody>
                        <VStack w="full" >
                            <Box w="full" p={2}><Text fontSize={"18px"}>Home</Text></Box>
                            <Box w="full" p={2}><Text fontSize={"18px"} onClick={()=>router.push("/profile")}>Profile</Text></Box>
                            <Box w="full" p={2}><Text fontSize={"18px"} onClick={()=>router.push("/Sos")}>Save our souls</Text></Box>
                            <Box w="full" p={2}><Text fontSize={"18px"} onClick={()=>router.push('/reportIncident')}>Report Incident</Text></Box>
                            <Box w="full" p={2} onClick={handleCommunity}><Text fontSize={"18px"}>Community</Text></Box>
                            <Box w="full" p={2}><Text fontSize={"18px"}>Explore Safe spot</Text></Box>
                            <Box w="full" p={2}><Text fontSize={"18px"} onClick={()=>router.push('/donations')}>Donation</Text></Box>
                            <Box w="full" p={2}><Text fontSize={"18px"}>Reedem</Text></Box>

                        </VStack>
                    </DrawerBody>
                    {/* home ,profile , community ,explore safe spot , donation, redeem */}
                    <DrawerFooter>
                        {
                            !user ? 
                            <Button onClick={onOpenmodal} bg="blue" color={"white"} w="full" fontSize={"18px"}> Login</Button>
                            :
                            <Button onClick={handleSignout} bg="blue" color={"white"} w="full" fontSize={"18px"}> Logout</Button>
                        }
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <LoginModal isOpen={isOpenmodal} onClose={onClosemodal} onOpen={onOpenmodal} />
        </>
    )
}

export default Navbar