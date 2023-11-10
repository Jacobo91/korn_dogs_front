import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
    handleTermChange: (term: string) => void;
}

function SearchBar({ handleTermChange }: SearchBarProps) {

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        handleTermChange(value)
    }

    return (
        <div className='searchbar-wrapper'>
            <SearchIcon/>
            <form action=''>
                <input 
                    type="search" 
                    onChange={onChange}
                    placeholder='Search product or supply...'
                    className="searchbar"
                />
            </form>
        </div>
    )
}

export default SearchBar