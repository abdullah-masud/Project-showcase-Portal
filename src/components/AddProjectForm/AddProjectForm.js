import React, { useEffect, useState } from 'react'
import Technology from '../../Data/data'
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from '../../Shared/firebase.init'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../components/Loader/Loader';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const AddProjectForm = () => {
    const [inputData, setInputData] = useState({});
    const [techList, setTechList] = useState([])
    const [imageFile, setImageFile] = useState([])
    const [submit, setSubmit] = useState(false);
    const [loader, setLoader] = useState(false)
    const [docId, setDocId] = useState(Date.now().toString());

    const { data: session } = useSession()
    const db = getFirestore(app);
    const storage = getStorage(app);
    const router = useRouter();
    const notify = () => toast("Successfully Uploaded To Firestore");

    useEffect(() => {
        if (session) {
            setInputData((values) => ({
                ...values,
                userName: session.user?.name,
            }));
            setInputData((values) => ({
                ...values,
                userImage: session.user?.image,
            }));
            setInputData((values) => ({
                ...values,
                userEmail: session.user?.email,
            }));
        }
    }, [session]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputData((values) => ({
            ...values, [name]: value
        }))
    }

    const onTechSelect = (name, isChecked) => {
        if (isChecked) {
            setTechList(techList => [...techList, name])
        }
        else {
            let techListItem = techList.filter(item => item !== name)
            setTechList(techListItem)
        }
    }

    useEffect(() => {
        setInputData((values) => ({
            ...values, ['techList']: techList
        }))
    }, [techList])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoader(true)
        const storageRef = ref(storage, 'project-showcase-portal/' + imageFile?.name);
        uploadBytes(storageRef, imageFile).then((snapshot) => {
            console.log('File uploaded to firebase');
        }).then(res => {
            getDownloadURL(storageRef).then((url) => {
                setInputData((values) => ({
                    ...values, image: url
                }));
                setSubmit(true)
            })
        })
        // await setDoc(doc(db, "projects", Date.now().toString()), inputData);
        // notify()
    }

    useEffect(() => {
        if (submit == true) {
            saveDoc();
        }
    }, [submit])

    const saveDoc = async () => {
        await setDoc(doc(db, "Projects", docId), inputData);
        setLoader(false)
        notify()
        router.push('/profile')
    }

    return (
        <div className="flex justify-center mt-10 shadow-md mx-4 md:mx-56 lg:mx-72 p-5 rounded-md">
            {
                loader ? <div className='absolute'><Loader /></div> : null
            }
            <form onSubmit={handleSubmit}>
                <h2 className="text-[30px] font-extrabold text-blue-500" >
                    ADD PROJECT
                </h2>
                <h2 className="mb-6">Create New Project and Explore with Community</h2>
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="Title"
                    required
                    className="w-full mb-4 border-[1px] p-2 rounded-md"
                />
                <textarea
                    name="description"
                    onChange={handleChange}
                    className="w-full mb-4  outline-blue-400 border-[1px]  p-2 rounded-md"
                    required
                    placeholder="Write Description here"
                />
                <h2 className="mb-3 font-bold">Select Technology</h2>
                <div className="grid grid-cols-2 mb-4 md:grid-cols-3  ">
                    {Technology.map((item, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <input id="technology"
                                onClick={(e) => onTechSelect(item.name, e.target.checked)}
                                type="checkbox"
                                className="w-4 h-4" />
                            <label>{item.name}</label>
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    name="app-demo-url"
                    onChange={handleChange}
                    placeholder="App Demo Url"
                    className="w-full mb-4 border-[1px] p-2 rounded-md"
                />
                <input
                    type="text"
                    name="ui-ux-design-url"
                    onChange={handleChange}
                    placeholder="UI/UX Design Url(Figma)"
                    className="w-full mb-4 border-[1px] p-2 rounded-md"
                />
                <input
                    type="text"
                    name="youtube-url"
                    onChange={handleChange}
                    placeholder="Youtube Tutorial Url"
                    className="w-full mb-4 border-[1px] p-2 rounded-md"
                />
                <input
                    type="text"
                    name="github-url"
                    onChange={handleChange}
                    placeholder="Github Source Code Url"
                    className="w-full mb-4 border-[1px] p-2 rounded-md"
                />

                <input
                    type="text"
                    name="instagram-profile"
                    onChange={handleChange}
                    placeholder="Instagram Profile"
                    className="w-full mb-4 border-[1px] p-2 rounded-md"
                />
                <input
                    type="file"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    accept="image/gif, image/jpeg, image/png"
                    className="mb-5 border-[1px] w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 w-full p-1 rounded-md text-white"
                >
                    Submit
                </button>
            </form>

        </div>
    )
}

export default AddProjectForm