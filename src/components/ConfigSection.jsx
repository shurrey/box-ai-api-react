
const ConfigSection = ({ formData, onChange, onSubmit }) => {
    
    return (
        <div className="form-section">
            <form onSubmit={onSubmit}>
                <label htmlFor="token">Developer Token: </label>
                <input type="text" id="token" name="token" value={formData.token} onChange={onChange}/>

                <label>
                    <p>Mode: 
                    <select name="mode" value={formData.mode} onChange={onChange}>
                        <option value="text_gen">Generate Text</option>
                        <option value="single_item_qa">Q&A</option>
                    </select></p>
                </label>
                
                <label htmlFor="fileId">File Id: </label>
                <input type="text" id="fileId" name="fileId" value={formData.fileId} onChange={onChange}/>

                <button type="submit">Submit</button>
                </form>
        </div>
    )
}

/*


a4Gja9GXZLj9A6yIEADs7VxiqLFhlcV0
1169680553945
*/
export default ConfigSection