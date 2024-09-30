/* Rutas de usuarios/auth
 host + /api/auth
*/

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

router.post(
  "/new",
  [
    //middlewares
    check("name", "el nombre es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password debe ser de 5 caracteres").isLength({
      min: 5,
    }),
    validarCampos,
  ],

  crearUsuario
);

router.post(
  "/",
  [
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password debe ser de 5 caracteres").isLength({
      min: 5,
    }),
    validarCampos,
  ],
  loginUsuario
);

router.get("/renew", validarJWT, revalidarToken);
module.exports = router;
