const {NavLink} = ReactRouterDOM




export function Compose (){


return <NavLink to='/mail/compose' className='compose-mail'>
    <span className="mail-compose-sign"></span>
    <span className="mail-compose-txt">Compose</span>
    
    </NavLink>

}