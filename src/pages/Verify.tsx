import CodeInputComponent from '@/components/CodeInputComponent';
function Verify() {
    return (
        <div className='md:hero h-screen flex flex-col justify-center items-center w-full bg-linear-to-r from-black to-[#cd1e1a]'>
                <div className="hero-content flex flex-col-reverse lg:flex-row lg:h-full w-full p-0 max-w-full gap-0">
                    <CodeInputComponent />
                </div>
        </div>
    )
}

export default Verify;