import {Router} from 'express'
import {register,login,logout,profile,verifyToken,getUsers,updateProfile,addMessage} from '../controllers/auth.controller.js';
import {authRequire} from '../middlewares/validateToken.js'
import {validateSchema} from '../middlewares/validator.middleware.js'
import {registerSchema,loginSchema, updateSchema,feedbackSchema} from '../schemas/auth.schema.js'

const router=Router()

router.get('/home',getUsers)
router.put("/update",validateSchema(updateSchema),updateProfile)
router.get('/verify', verifyToken)
router.post('/register',validateSchema(registerSchema), register)
router.post('/login',validateSchema(loginSchema), login)
router.post('/logout', logout)
router.put("/feed",validateSchema(feedbackSchema),addMessage)

router.get('/profile', authRequire,profile)


export default router;