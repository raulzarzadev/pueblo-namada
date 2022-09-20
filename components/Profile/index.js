import HostProfile from './HostProfile'
import { useUser } from '../../components/context/userContext'
import Image from 'next/image'
const UserProfile = () => {
  const {
    user: { displayName, email, id }
  } = useUser()
  return (
    <div className="max-w-lg mx-auto">
      <div className=" ">
        <div className="relative ">
          <CoverPhoto src={'https://placeimg.com/192/192/city'} />
          <div className="absolute -bottom-12 left-5">
            <Avatar src={'https://placeimg.com/192/192/people'} />
          </div>
        </div>
        <div className="pl-28 h-28 flex justify-between">
          <div>
            <h2 className="font-bold text-lg">{displayName || email}</h2>
            <p>{email}</p>
          </div>
          <div className="pt-2">
            <button className="btn btn-primary btn-sm">Edit profile</button>
          </div>
        </div>
      </div>

      <HostProfile />
    </div>
  )
}

export const CoverPhoto = ({ src }) => (
  <div>
    <div className="relative h-36 w-full ">
      <Image
        className="md:rounded-b-lg"
        layout="fill"
        objectFit="cover"
        src={src}
        alt="user avatar"
      />
    </div>
  </div>
)
export const Avatar = ({ src }) => (
  <div className="avatar">
    <div className="relative w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
      <Image
        className=""
        layout="fill"
        objectFit="contain"
        src={src}
        alt="user avatar"
      />
    </div>
  </div>
)

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      data: null
    }
  }
}
//
// <div className='bs'>
// <img
//   src="https://placeimg.com/192/192/city"
//   alt="user avatar profile"
// />
// </div>
// <div className="avatar">
// <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//   <img
//     src="https://placeimg.com/192/192/people"
//     alt="user avatar profile"
//   />
// </div>
// </div>
// <h1 className="text-xl font-bold">{displayName || email}</h1>

export default UserProfile
