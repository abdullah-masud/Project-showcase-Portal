import app from '@/Shared/firebase.init';
import UserInfo from '@/components/Profile/UserInfo';
import { getFirestore } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import ProjectList from '@/components/Profile/ProjectList';


const Profile = () => {
    const { data: session } = useSession();
    const db = getFirestore(app)
    const [userProject, setUserProject] = useState([])



    useEffect(() => {
        getUserProject()
    }, [session])

    const getUserProject = async () => {
        setUserProject([])
        if (session) {
            const q = query(collection(db, "Projects"), where("userEmail", "==", session.user?.email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                setUserProject(userProject => [...userProject, doc.data()])
            });

        }
    }

    return (
        <div>
            <UserInfo />
            <ProjectList userProject={userProject} />
        </div>
    );
};

export default Profile;