function sendEmailByDates(document) {
  if (document.dates.FechaBancosDone !== undefined && document.dates.FechaBancosDone !== true) {
    if (new Date(document.dates.FechaBancos).valueOf() >= new Date().valueOf()) {
      emailService.createImportEmail(doc.id, document.email, "Aceptación declaración de importación.", "",
        "Su proceso de importación se encuentra pendiente de pago en bancos", "")
    }
  }
  if (document.dates.FechaJevDianDone !== undefined && document.dates.FechaJevDianDone !== true) {
    if (new Date(document.dates.FechaJevDian).valueOf() >= new Date().valueOf()) {
      emailService.createImportEmail(doc.id, document.email, "Presentación en bancos.", "",
        "Su declaración de importación ha sido presentada en bancos en espera de selectividad ante la DIAN.", "")
    }
  }
  if (document.dates.FechaPreinscripcionDone !== undefined && document.dates.FechaPreinscripcionDone !== true) {
    if (new Date(document.dates.FechaPreinscripcion).valueOf() >= new Date().valueOf()) {
      emailService.createImportEmail(doc.id, document.email, "Inspección física.", "",
        `Su proceso de importación para inspección física el día ${document.dates.FechaPreinscripcion} en el depósito de ${document.info.deposite}`, "")
    }
  }
  if (document.dates.FechaInspeccionDone !== undefined && document.dates.FechaInspeccionDone !== true) {
    if (new Date(document.dates.FechaInspeccion).valueOf() >= new Date().valueOf()) {
      emailService.createImportEmail(doc.id, document.email, "Inspección automática.", "",
        `Su proceso de importación se encuentra listo para iniciar la liquidación de bodegajes ante el depósito ${document.info.deposite}`, "")
    }
  }
  if (document.dates.FechaDepositoDone !== undefined && document.dates.FechaDepositoDone !== true) {
    if (new Date(document.dates.FechaDeposito).valueOf() >= new Date().valueOf()) {
      emailService.createImportEmail(doc.id, document.email, "Retiro de mercancía.", "",
        `Su proceso de importación tiene fecha de retiro para el día ${document.dates.FechaDeposito}`, "")
    }
  }
  if (document.dates.FechaEntregTranspDone !== undefined && document.dates.FechaEntregTranspDone !== true) {
    if (new Date(document.dates.FechaEntregTransp).valueOf() >= new Date().valueOf()) {
      emailService.createImportEmail(doc.id, document.email, "Entrega de mercancía al transporte.", "",
        `Su mercancía ha sido entregada al transportador y se permite adjuntar carta de porte.`, "")
    }
  }
  if (document.dates.FechaCierreDone !== undefined && document.dates.FechaCierreDone !== true) {
    if (new Date(document.dates.FechaCierre).valueOf() >= new Date().valueOf()) {
      if (document.adType == "Exportación") {
        emailService.createImportEmail(doc.id, document.email, "Arribo de mercancía en lugar de retiro.", "",
          `Su mercancía se encuentra en proceso de entrega en lugar de destino.`, "")
      }
      emailService.createImportEmail(doc.id, document.email, "Factura.", "",
        `Su trámite ha finalizado su número de factura de venta ${document.dates.billName}.`, "")
    }
  }

  if (document.dates.FechaCutOffFisDone !== undefined && document.dates.FechaCutOffFisDone !== true) {
    if (new Date(document.dates.FechaCutOffFis).valueOf() >= new Date().valueOf()) {
      emailService.createImportEmail(doc.id, document.email, "Cut off.", "",
        `La fecha de su cierre físico está programada para el día ${document.dates.FechaCutOffFis}`, "")
    }
  }
  if (document.dates.FechaIngresoPuertoDone !== undefined && document.dates.FechaIngresoPuertoDone !== true) {
    if (new Date(document.dates.FechaIngresoPuerto).valueOf() >= new Date().valueOf()) {
      emailService.createImportEmail(doc.id, document.email, "Fecha de ingreso.", "",
        `Su mercancía se encuentra ingresada al puerto ${document.info.port}`, "")
    }
  }
  if (document.dates.FechaInspeccionDone !== undefined && document.dates.FechaInspeccionDone !== true) {
    if (new Date(document.dates.FechaInspeccion).valueOf() >= new Date().valueOf()) {
      emailService.createImportEmail(doc.id, document.email, "Inspección antinarcóticos.", "",
        `Su mercancía se encuentra programada para la inspección antinarcóticos el día ${document.dates.FechaInspeccion}`, "")
    }
  }
}

module.exports.sendEmailByDates = sendEmailByDates;