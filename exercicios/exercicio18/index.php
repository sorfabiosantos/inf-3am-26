<?php

require_once __DIR__ . '/../../source/autoload.php';

use source\Models\HospitalGeral\Doctor;
use source\Models\HospitalGeral\Patient;
use source\Models\HospitalGeral\MedicalRecord;

echo "Exercício 18 – Sistema Hospitalar (Encapsulamento)" . "<br>";
echo "===================================================" . "<br><br>";

// -----------------------------------------------------------------------
// 1. Médicos (Doctors)
// -----------------------------------------------------------------------

$dr_carlos = new Doctor(1, "Carlos Mendes", "carlos@hospital.com", "CRM/SP 123456", "Cardiologia");
$dr_ana    = new Doctor(2, "Ana Souza",     "ana@hospital.com",    "CRM/RJ 654321", "Pediatria");

// Alterando email e especialidade (setters permitidos)
$dr_ana->setEmail("ana.souza@hospital.com");
$dr_ana->setSpecialty("Neonatologia");

// -----------------------------------------------------------------------
// 2. Pacientes (Patients)
// -----------------------------------------------------------------------

$p1 = new Patient(1, "Ana Lima",      "12345678901", "1990-05-14", "A+");
$p2 = new Patient(2, "Bruno Ferreira","98765432100", "1985-11-22", "O-");
$p3 = new Patient(3, "Carla Oliveira","45678912300", "2000-03-07", "AB+");

// Adicionando alergias ao paciente 1
$p1->addAllergy("Penicilina");
$p1->addAllergy("Dipirona");
$p1->addAllergy("Penicilina"); // duplicata — deve ser ignorada

// Adicionando alergia ao paciente 3
$p3->addAllergy("Látex");

// -----------------------------------------------------------------------
// 3. Prontuários (Medical Records)
// -----------------------------------------------------------------------

$r1 = new MedicalRecord(
    1, $p1, $dr_carlos,
    "Hipertensão arterial leve",
    "Losartana 50mg 1x ao dia. Retorno em 30 dias."
);

$r2 = new MedicalRecord(
    2, $p2, $dr_ana,
    "Bronquite aguda",
    "Salbutamol spray 2 jatos a cada 6h. Repouso por 5 dias."
);

$r3 = new MedicalRecord(
    3, $p3, $dr_carlos,
    "Arritmia cardíaca leve",
    "Propranolol 40mg 2x ao dia. ECG de controle em 15 dias."
);

$r4 = new MedicalRecord(
    4, $p1, $dr_ana,
    "Otite média aguda",
    "Amoxicilina 500mg 3x ao dia por 7 dias. Antitérmico se necessário."
);

// -----------------------------------------------------------------------
// 4. Verificação de alergia com hasAllergy()
// -----------------------------------------------------------------------

echo "=== Verificação de Alergias ===" . "<br>";
$verificar = "Penicilina";
if ($p1->hasAllergy($verificar)) {
    echo "⚠️  {$p1->getName()} possui alergia a: {$verificar}" . "<br>";
} else {
    echo "✅ {$p1->getName()} não possui alergia a: {$verificar}" . "<br>";
}
$verificar2 = "Aspirina";
if ($p1->hasAllergy($verificar2)) {
    echo "⚠️  {$p1->getName()} possui alergia a: {$verificar2}" . "<br>";
} else {
    echo "✅ {$p1->getName()} não possui alergia a: {$verificar2}" . "<br>";
}
echo "<br>";

// -----------------------------------------------------------------------
// 5. Demonstração de encapsulamento — acesso direto bloqueado
//    (linhas comentadas propositalmente para não interromper a execução)
// -----------------------------------------------------------------------

// ❌ ERRO: Cannot access private property Patient::$cpf
// $p1->cpf = "00000000000";

// ❌ ERRO: não existe setter para diagnosis em MedicalRecord
// $r1->setDiagnosis("outro diagnóstico");

// -----------------------------------------------------------------------
// 6. Exibição dos médicos
// -----------------------------------------------------------------------

echo "=== Médicos ===" . "<br>";
foreach ([$dr_carlos, $dr_ana] as $medico) {
    echo $medico->show() . "<br><br>";
}

// -----------------------------------------------------------------------
// 7. Exibição dos pacientes
// -----------------------------------------------------------------------

echo "=== Pacientes ===" . "<br>";
foreach ([$p1, $p2, $p3] as $paciente) {
    echo $paciente->show() . "<br><br>";
}

// -----------------------------------------------------------------------
// 8. Exibição dos prontuários
// -----------------------------------------------------------------------

echo "=== Prontuários ===" . "<br>";
foreach ([$r1, $r2, $r3, $r4] as $prontuario) {
    echo $prontuario->show() . "<br><br>";
}


