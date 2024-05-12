function Birthday({ form, setForm, currentStep, setCurrentStep }) {
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    return (
        <>
            <h1>Birthday</h1>
            <input
                onChange={handleChange}
                value={form.date_of_birth}
                name="date_of_birth"
                type="date" />
            <button onClick={() => { setCurrentStep(currentStep + 1) }}>Next</button>
        </>
    )
}

export default Birthday