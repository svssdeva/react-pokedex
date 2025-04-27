export function Loading () {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 animate-pulse">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md space-y-6">
                {/* Image Skeleton */}
                <div className="flex gap-4 justify-center">
                    <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
                    <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
                </div>

                {/* Title Skeleton */}
                <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
                <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto mt-2"></div>

                {/* Button Skeleton */}
                <div className="h-8 bg-blue-300 rounded w-1/2 mx-auto mt-4"></div>

                {/* Stats Skeleton */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                </div>

                {/* Moves Skeleton */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                </div>

                {/* Back button skeleton */}
                <div className="h-10 bg-gray-400 rounded w-1/2 mx-auto mt-8"></div>
            </div>
        </div>
    );
}