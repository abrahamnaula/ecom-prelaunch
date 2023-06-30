// pages/collections/[collectionName].js
import { useRouter } from 'next/router'
export default function Collection() {
    const router = useRouter()
    const { collectionName } = router.query
    console.log('sup')
    return (
        <div className="text-white">{collectionName}</div>
    )
}
